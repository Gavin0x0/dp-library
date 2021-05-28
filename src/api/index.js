/* eslint-disable*/
import axios from "axios";
import { get, post, getImg, getFile, postFile } from "./http";

//测试servlet
export const dbtest = () => get(`db-test`);

//获取商品信息
export const getGood = (params) => get(`getGood`, params);

/**
 * 登录（GET）
 * 需传入的参数
 * username: str
 * password: str
 * @param {URLSearchParams} params
 * @returns
 */
export const login = (params) => get(`login`, params);

/**
 * 获取验证码（GET）
 * 需要传入一个随机数
 * 返回blob数据，需手动渲染
 * 注意检查cookie是否可以跨域，否则验证码会失效
 * @param {number} v
 * @returns
 */
export const getCaptcha = (v) => getImg(`captcha?v = ${v}`);

/**
 * 退出登录（POST）
 * @returns
 */
export const logout = () => get(`eta6/logout`);

/**
 * 获取图片（GET）
 * 需要传入url
 * 返回blob数据，需手动渲染
 * 注意检查cookie是否可以跨域，否则图片会失效
 * @param {string} path
 * @returns
 */
export const getImage = (path) => getImg(`${path}`);

// =====================================================================> 奖项管理 API
/**
 * 获取全部奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * type: 0：全部 1:学生 2:教师 奖项类型
 * key: 关键词
 * order: desc
 * @param {URLSearchParams} params
 * @returns
 */
export const getAllAwardList = (params) => get(`eta6/award/list`, params);

/**
 * 设置辅导员
 * 请求方法: POST
 * ids[]: 63
 * classIds[]: 140
 * classIds[]: 141
 * classIds[]: 142
 * classIds[]: 143
 * classIds[]: 144
 * usernames[]: 999100235
 * roleId: 3
 * oldroleIds[]: 3
 * 设置其他角色
 * ids[]: 91
 * usernames[]: 999100236
 * roleId: 2
 * oldroleIds[]: 3
 */
export const setRole = (params) =>
  post(`eta6/teacher-management/setRole`, params);

// =====================================================================> 学生导入页 API
/**
 * 下载学生模板
 * @returns
 */
export const getStuTemplate = () => getFile(`eta6/import-stu/download`);

/**
 * 上传学生（POST）
 * 需传入的参数
 * class: 班级号「classId」
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const uploadStuTemplate = (data) =>
  postFile(`eta6/import-stu/upload`, data);
