import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/daili/check',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(username) {
  return request({
    url: '/admin/daili/getInfo',
    method: 'post',
    // params: { token },
    data: {
      username,
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
