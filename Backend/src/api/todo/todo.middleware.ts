import { NextFunction, Request, Response } from 'express';
import { CreateTodoDTO } from './todo.dto';
import { TodoService } from './todo.service';
import userService from '../user/user.service';
import { ValidationError } from '../../errors/validation';
import { ValidationError as OriginalValidationError } from "class-validator";
import { NotFoundError } from '../../errors/not-found';
import { TodoModel } from './todo.model';

const todoService = new TodoService(TodoModel); 

export const validateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const method = req.method;
        const path = req.path;
        const user = req.user;

        if (method === 'POST' && path === '/') {
            const todoDTO = new CreateTodoDTO();
            todoDTO.title = req.body.title;
            todoDTO.dueDate = req.body.dueDate;
            todoDTO.completed = req.body.completed;
            todoDTO.assignedTo = req.body.assignedTo;

            if (todoDTO.assignedTo) {
                const userExists = await userService.getUserById(todoDTO.assignedTo.toString());
                if (!userExists) {
                    const errors: OriginalValidationError[] = [{
                        property: "assignedUserId",
                        constraints: {
                            userNotFound: "The assigned user does not exist."
                        },
                        value: todoDTO.assignedTo.toString()
                    }];
                    throw new ValidationError(errors);
                }
            }
            req.body = todoDTO;
        }
        
        if (method === 'POST' && path.endsWith('/assign')) {
            const assignedUserId = req.body.userId;
            const userExists = await userService.getUserById(assignedUserId);
            if (!userExists) {
                const errors: OriginalValidationError[] = [{
                    property: "assignedUserId",
                    constraints: {
                        userNotFound: "The assigned user does not exist."
                    },
                    value: assignedUserId
                }];
                throw new ValidationError(errors);
            }

            const todoId = req.params.id;
            const todoExists = await todoService.getTodoById(todoId);
            if (!todoExists) {
                throw new NotFoundError();
            }

            const createdByCurrentUser = await todoService.isTodoCreatedByCurrentUser(todoId, user?.id || "");
            if (!createdByCurrentUser) {
                throw new NotFoundError();
            }
        }

        
        if (method === 'POST' && (path.endsWith('/check') || path.endsWith('/uncheck'))) {
            const todoId = req.params.id;
            const todoExists = await todoService.getTodoById(todoId);
            if (!todoExists) {
                throw new NotFoundError();
            }
        }
        next();
    } catch (err) {
        next(err);
    }
};
