import { NextFunction, Request, Response } from 'express';
import { Controller, Delete, Post, Get, Put } from '@overnightjs/core';
import { Service } from 'typedi';
import Log from '../utils/Log';
import { BaseResponse } from '../services/BaseResponse';
import { ExClassService } from '../services/ExClassService';
import { Exclass } from '../entities/ExClass';
import { DeleteResult } from 'typeorm';

@Service()
@Controller('api/exclass')
export class ExClassController {
  private dataResponse: BaseResponse = new BaseResponse();
  private className = 'ExClassController';
  constructor(private readonly ExClassService: ExClassService) {}
  @Get('list')
  private async getListExclass(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'getExClass', `RQ`, { req: req });
    try {
      const result: Exclass[] = await this.ExClassService.index().catch((e) => {
        throw e;
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
  private async getExclass(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'getExClass', `RQ`, { req: req });
    try {
      const id: string = req.params.id;
      if (!id) {
        res.status(400).json({ message: 'Missing id parameter' });
        return;
      }
      const result: Exclass = await this.ExClassService.findById(id).catch((e) => {
        throw e;
      });
      this.dataResponse.status = 200;
      this.dataResponse.data = result;
      this.dataResponse.message = 'Successfull';
      res.status(200).json(this.dataResponse.data);
    } catch (e) {
      next(e);
    }
  }
  @Post('')
  private async postExclass(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'addExClass', `RQ`, { req: req });
    try {
      const result: Exclass = await this.ExClassService.store(req.body).catch((e) => {
        throw e;
      });
      this.dataResponse.status = 200;
      this.dataResponse.data = result;
      this.dataResponse.message = 'Successfull';
      res.status(200).json(this.dataResponse.data);
    } catch (e) {
      next(e);
    }
  }
  @Put('')
  private async updateExclass(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'updateExClass', `RQ`, { req: req });
    try {
      const result: Exclass = await this.ExClassService.store(req.body).catch((e) => {
        throw e;
      });
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
    Log.info(this.className, 'deleteExClass', `RQ`, { req: req });
    try {
      const id: string = req.params.id;
      if (!id) {
        res.status(400).json({ message: 'Missing id parameter' });
        return;
      }
      const result: DeleteResult = await this.ExClassService.delete(id).catch((e) => {
        throw e;
      });

      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }
}
