import {stringify} from 'qs';
import request from '../utils/request';
import config from '../config';

export async function initData(params) {
  console.log("service~``~~~~~~query url   " + `/api/users}`);
  return request(`/api/initData?${stringify(params)}`);
}

export async function query(params) {
  console.log("service~``~~~~~~query url   " + `/api/query}`);
  return request(`/api/query`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function deleteData(params) {
  console.log("service~``~~~~~~deleteData url   " + `/api/delete}`);
  return request(`/api/delete`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function addData(params) {
  console.log("service~``~~~~~~deleteData url   " + `/api/delete}`);
  return request(`/api/addData`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function update(params) {
  console.log("grant~``~~~~~~query");
  return request(`/api/update`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
