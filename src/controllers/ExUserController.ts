import { NextFunction, Request, Response } from 'express';
import { Controller, Delete, Post, Get, Put } from '@overnightjs/core';
import { Service } from 'typedi';
import { DeleteResult } from 'typeorm';
import Log from '../utils/Log';
import { ExUserService } from '../../src/services/ExUserService';
import { ExUser } from '@entities/ExUser';
import { BaseResponse } from '../services/BaseResponse';
import { ExClassService } from '../services/ExClassService';
import { Exclass } from '@entities/ExClass';
import jwt from 'jsonwebtoken';

@Service()
@Controller('api/exuser')
export class ExUserController {
  private dataResponse: BaseResponse = new BaseResponse();
  private className = 'ExUserController';
  constructor(private readonly ExUserService: ExUserService, private readonly ExClassService: ExClassService) {}

  @Get('list')
  private async getListExuser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'getExUser', `RQ`, { req: req });
    try {
      const exUserresult: ExUser[] = await this.ExUserService.index().catch((e) => {
        throw e;
      });
      const exClassresult: Exclass[] = await this.ExClassService.index().catch((e) => {
        throw e;
      });
      const result = exUserresult.map((item) => {
        return { ...item, ...exClassresult[item.classId - 1] };
      });
      this.dataResponse.status = 200;
      this.dataResponse.data = result;
      this.dataResponse.message = 'Successfull';
      res.status(200).json(this.dataResponse.data);
    } catch (e) {
      next(e);
    }
  }
  @Get(':id')
  private async getExuser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'getExUser', `RQ`, { req: req });
    try {
      const id: string = req.params.id;
      if (!id) {
        res.status(400).json({ message: 'Missing id parameter' });
        return;
      }
      const exUserResult: ExUser = await this.ExUserService.findById(id).catch((e) => {
        throw e;
      });
      const exClassResult: Exclass = await this.ExClassService.findById(exUserResult.classId, {
        select: ['className']
      }).catch((e) => {
        throw e;
      });
      const result = { ...exUserResult, ...exClassResult };
      this.dataResponse.status = 200;
      this.dataResponse.data = result;
      this.dataResponse.message = 'Successfull';
      res.status(200).json(this.dataResponse.data);
    } catch (e) {
      next(e);
    }
  }
  @Post('login')
  private async postLoginExUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'addExUser', `RQ`, { req: req });
    try {
      const { email, pwd } = req.body;
      const exUserResult: ExUser[] = await this.ExUserService.index({
        select: ['id', 'email', 'role'],
        where: {
          email: email,
          pwd: pwd
        }
      }).catch((e) => {
        throw e;
      });
      const token = jwt.sign(
        { id: exUserResult[0].id, email: exUserResult[0].email, role: exUserResult[0].role },
        'nhatninh2871'
      );
      const result = { jwt: token };
      this.dataResponse.status = 200;
      this.dataResponse.data = result;
      this.dataResponse.message = 'Successfull';
      res.status(200).json(this.dataResponse.data);
    } catch (e) {
      next(e);
    }
  }
  @Post('')
  private async postExUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'addExUser', `RQ`, { req: req });
    try {
      const exUserResult: ExUser = await this.ExUserService.store(req.body).catch((e) => {
        throw e;
      });
      const exClassResult: Exclass = await this.ExClassService.findById(exUserResult.classId, {
        select: ['className']
      }).catch((e) => {
        throw e;
      });
      const result = { ...exUserResult, ...exClassResult };
      this.dataResponse.status = 200;
      this.dataResponse.data = result;
      this.dataResponse.message = 'Successfull';
      res.status(200).json(this.dataResponse.data);
    } catch (e) {
      next(e);
    }
  }
  @Put('')
  private async updateExUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'updateExUser', `RQ`, { req: req });
    try {
      const exUserResult: ExUser = await this.ExUserService.store(req.body).catch((e) => {
        throw e;
      });
      const exClassResult: Exclass = await this.ExClassService.findById(exUserResult.classId, {
        select: ['className']
      }).catch((e) => {
        throw e;
      });
      const result = { ...exUserResult, ...exClassResult };
      this.dataResponse.status = 200;
      this.dataResponse.data = result;
      this.dataResponse.message = 'Successfull';
      res.status(200).json(this.dataResponse.data);
    } catch (e) {
      next(e);
    }
  }
  @Delete(':id')
  private async deleteExuser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'deleteExUser', `RQ`, { req: req });
    try {
      const id: string = req.params.id;
      if (!id) {
        res.status(400).json({ message: 'Missing id parameter' });
        return;
      }
      await this.ExUserService.delete(id).catch((e) => {
        throw e;
      });

      res.status(200).json(true);
    } catch (e) {
      next(e);
    }
  }
}
