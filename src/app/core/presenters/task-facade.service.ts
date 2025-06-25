import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { firstValueFrom, Observable } from 'rxjs';
import { ToastErorMessage, ToasSuccessMessage } from '../const/magicStrings';
import { TaskService } from '../services/task.service';
import { ToastService } from '../services/toast.service';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskFacadeService {
  private _toastService: ToastService = inject(ToastService);
  private _taskService: TaskService = inject(TaskService);

  tasksPageIndex: number = environment.pageIndexStart || 1;
  tasksPageSize: number = environment.pageSize || 10;
  tasksOrder: string = environment.defaultOrder || "asc";

  constructor() { }

  async createTask(task: any): Promise<any> {
    console.log("crear");
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const user = JSON.parse(value as string);

    const token = user.token || "";
    
    if(token) {
      return firstValueFrom(this._taskService.createTask(task, token))
        .then(response => {
          this._toastService.showToast(ToasSuccessMessage.createTask || "", 'success').then(() => true);
          return true;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.createTask || "", 'danger').then(() => false);
        });
    }
  }
  
  async updateTask(taskId: string, task: any): Promise<any> {
    console.log("actualizar");
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const user = JSON.parse(value as string);

    const token = user.token || "";
    
    if(token) {
      return firstValueFrom(this._taskService.updateTask(taskId, token, task))
        .then(response => {
          this._toastService.showToast(ToasSuccessMessage.updateTask || "", 'success').then(() => true);
          return true;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.updateTask || "", 'danger').then(() => false);
        });
    }
  }

  async getAllTask(): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });

    const body = {
      page: this.tasksPageIndex,
      size: this.tasksPageSize,
      order: this.tasksOrder,
    }
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const token = JSON.parse(value as string).token || "";

    if(token) {
      return firstValueFrom(this._taskService.getAllTask(body, token))
        .then(response => {
          console.log(response);
          return response;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.getTaskData || "", 'danger').then(() => false);
        });
    }
  }

  async getTaskById(taskId: string): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const token = JSON.parse(value as string).token || "";

    if(token) {
      return firstValueFrom(this._taskService.getTaskById(taskId, token))
        .then(response => {
          console.log(response);
          return response;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.getTaskData || "", 'danger').then(() => false);
        });
    }
  }

  async deleteTask(taskId: string): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const token = JSON.parse(value as string).token || "";

     if(token) {
      return firstValueFrom(this._taskService.deleteTask(taskId, token))
        .then(response => {
          console.log(response);
          this._toastService.showToast(ToasSuccessMessage.deleteTask || "", 'success').then(() => false);
          return response;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.deleteTask || "", 'danger').then(() => false);
        });
    }
  }

  async getAllTaskTypes(): Promise<any> {
    return firstValueFrom(this._taskService.getTaskTypes())
      .then(response => {
        return response.tasksTypes || [];
      })
      .catch(() => {
          return this._toastService.showToast(ToastErorMessage.getTaskTypes || "", 'danger').then(() => false);
        });
  }
}
