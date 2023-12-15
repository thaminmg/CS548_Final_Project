import { request } from "@/utils"

export function getCustomerAPI() {
    return request({
        url: '/customers',
        method: 'GET'
    })
}

export function getCustomerById(id) {
    return request({
        url: `/customers/${id}`,
        method: 'GET'
    })
}

export function deleteCustomerAPI(id) {
    return request({
        url: `/customers/${id}`,
        method: 'DELETE'
    })
}

export function updateCustomerAPI(data) {
    return request({
        url: `/customers/${data.id}`,
        method: 'PUT',
        data
    })
}

export function getCustomerListAPI(params) {
    return request({
        url: "/customers",
        method: 'GET',
        params
    })
}

export function createCustomerAPI(data) {
    return request({
        url: '/customers',
        method: 'POST',
        data
    })
}


