import request from '@/utils/request'

export function getAll(code,page) {
  return request({
    url: '/admin/user/getAll',
    method: 'post',
    data:{
      page,
      code
    }
  })
}

export function getCount() {
  return request({
    url: '/admin/user/getCount',
    method: 'post',
  })
}

export function addUser(data) {
  return request({
    url: '/admin/user/addUser',
    method: 'post',
    data:data
  })
}

export function zhuanZhang(data) {
  console.log(data);
  return request({
    url: '/admin/user/zhuanZhang',
    method: 'post',
    data:data
  })
}



