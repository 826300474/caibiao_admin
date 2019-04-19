import request from '@/utils/request'

export function getAll(code,page) {
  return request({
    url: '/admin/buy/getAll',
    method: 'post',
    data:{
      page,
      code
    }
  })
}

export function getCount(code) {
  return request({
    url: '/admin/buy/getCount',
    method: 'post',
    data:{
      code
    }
  })
}

export function addUser(data) {
  return request({
    url: '/admin/buy/addUser',
    method: 'post',
    data:data
  })
}

export function xiuGai(data) {
  return request({
    url: '/admin/buy/xiuGai',
    method: 'post',
    data:data
  })
}


