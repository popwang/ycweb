package com.environment.mypuls.service;

 import com.environment.mypuls.entity.TEquipmentInfo2;
import com.baomidou.mybatisplus.service.IService;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author niuchen
 * @since 2017-10-27
 */
public interface ITEquipmentInfo2Service extends IService<TEquipmentInfo2> {
	
    List<TEquipmentInfo2> getTEquipmentInfo(Map<String,Object> map) ;
    
    void updateTEquipmentInfo2(Map<String,Object> map);
    
    void updateTEquipmentInfo(Map<String,Object> map);
    
    void insertTEquipmentInfo2(Map<String,Object> map);
    /**
	 * 根据设备名称查询设备信息
	 * @param v_equipment_name
	 * @return
	 */
	List<TEquipmentInfo2> selectTEquipmentInfo2ByName(String v_equipment_name);
}
