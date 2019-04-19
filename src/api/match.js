import request from '@/utils/request'

export function getFooter() {
  return request({
    url: '/admin/match/getFooter',
    method: 'post',
  })
}



