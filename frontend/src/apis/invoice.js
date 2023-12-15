import { request } from "@/utils"

export function getInvoiceAPI() {
    return request({
        url: '/invoices',
        method: 'GET'
    })
}

export function getInvoiceById(id) {
    return request({
        url: `/invoices/${id}`,
        method: 'GET'
    })
}

export function getInvoiceListAPI(params) {
    return request({
        url: "/invoices",
        method: 'GET',
        params
    })
}

export function createInvoiceAPI(data) {
    return request({
        url: '/invoices',
        method: 'POST',
        data
    })
}

export function updateInvoiceAPI(data) {
    return request({
        url: `/invoices/${data.id}`,
        method: 'PUT',
        data
    })
}

export function deleteInvoiceAPI(id) {
    return request({
        url: `/invoices/${id}`,
        method: 'DELETE'
    })
}
