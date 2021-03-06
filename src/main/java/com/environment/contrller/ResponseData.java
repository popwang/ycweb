package com.environment.contrller;

import java.util.List;

/**
 * 客户端数据
 * 
 * @author sunjuncai
 * @date 2014-8-20
 * @param <T>
 */
public class ResponseData<T> {

	/**
	 * 数据
	 */
	private T data = null;

	/**
	 * 响应时间
	 */
	private String responseTime = null;

	/**
	 * 是否成功
	 */
	private ResponseEnum success;

	/**
	 * 提示信息
	 */
	private String message = null;

	private int totalCount = 0;

	/**
	 * 数据组 不需要分页时可用
	 */
	private List<?> dataList;

	public void setResponse(ResponseEnum success, String message) {
		this.success = success;
		this.message = message;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getResponseTime() {
		return responseTime;
	}

	public void setResponseTime(String responseTime) {
		this.responseTime = responseTime;
	}

	public ResponseEnum getSuccess() {
		return success;
	}

	public void setSuccess(ResponseEnum success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<?> getDataList() {
		return dataList;
	}

	public void setDataList(List<?> dataList) {
		this.dataList = dataList;
		this.setTotalCount(dataList.size());
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}