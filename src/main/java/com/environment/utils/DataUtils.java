package com.environment.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DataUtils {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		System.out.println(DataUtils.stampToDate("1504065322000"));
	}
	
	public static String stampToDate(String s){
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long lt = new Long(s);
        Date date = new Date(lt);
        res = simpleDateFormat.format(date);
        return res;
    }
	
	public static String dateToString(Date date){
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        res = simpleDateFormat.format(date);
        return res;
    }

}
