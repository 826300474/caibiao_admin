import request from '@/utils/request'

export function getAll(code,page) {
  return request({
    url: '/admin/zhuanzhang/getAll',
    method: 'post',
    data:{
      page,
      code
    }
  })
}

export function getCount() {
  return request({
    url: '/admin/zhuanzhang/getCount',
    method: 'post',
  })
}




