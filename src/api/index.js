/* eslint-disable*/
import { get, post, getImg, getFile, postFile } from "./http";

/**
 * 创建借阅证（POST）  
 * 参数：  
 * card_id: 借阅证编号  
 * reader_name: 读者姓名  
 * reader_sex: 读者性别  
 * reader_id: 读者身份证号  
 * unit_name: 单位名称  
 * create_date: 创建日期  
 * reader_type: 读者类型  
 * phone_num: 联系电话  
 * @param {JSON} data  
 * @returns
 */
 export const createLibCard = (data) => post(`createLibCard`, data);

/**
 * 查询借阅证（POST）
 * 参数：
 * field: str
 * password: str
 * order: 排序方式（可选） 
 * field: 排序字段（可选） 
 * @param {JSON} data
 * @returns
 */
export const queryLibCard = (data) => post(`queryLibCard`, data);

/**
 * 创建借阅证（POST）  
 * 参数：  
 * card_id: 借阅证编号  
 * reader_name: 读者姓名  
 * reader_sex: 读者性别  
 * reader_id: 读者身份证号  
 * unit_name: 单位名称  
 * create_date: 创建日期  
 * reader_type: 读者类型  
 * phone_num: 联系电话  
 * @param {JSON} data  
 * @returns
 */
 export const createBook = (data) => post(`createBook`, data);

/**
 * 查询借阅证（POST）
 * 参数：
 * field: str
 * password: str
 * order: 排序方式（可选） 
 * field: 排序字段（可选） 
 * @param {JSON} data
 * @returns
 */
export const queryBook = (data) => post(`queryBook`, data);

/**
 * 查询借阅证详情（GET）  
 * 参数：
 * card_id: str  
 * @param {URLSearchParams} params
 * @returns
 */
export const getLibCardDetail = (params) => get(`LibCardDetail`, params);

/**
 * 查询借阅信息（POST）
 * 参数：
 * field: str
 * password: str
 * order: 排序方式（可选） 
 * field: 排序字段（可选） 
 * @param {JSON} data
 * @returns
 */
 export const queryBorrInfo = (data) => post(`queryBorrInfo`, data);

/**
 * 查询借阅信息（POST）
 * 参数：
 * field: str
 * password: str
 * order: 排序方式（可选） 
 * field: 排序字段（可选） 
 * @param {JSON} data
 * @returns
 */
 export const queryFineInfo = (data) => post(`queryFineInfo`, data);

