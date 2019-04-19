import request from '@/utils/request'

export function getAll(code,page) {
  return request({
    url: '/admin/daili/getAll',
    method: 'post',
    data:{
      page,
      code
    }
  })
}

export function getCount(code) {
  return request({
    url: '/admin/daili/getCount',
    method: 'post',
    data:{
      code
    }
  })
}

export function addUser(data) {
  return request({
    url: '/admin/daili/addUser',
    method: 'post',
    data:data
  })
}

export function xiuGai(data) {
  return request({
    url: '/admin/daili/xiuGai',
    method: 'post',
    data:data
  })
}


