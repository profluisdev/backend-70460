import { movementDao } from "../persistence/dao/movement.dao.js";

class MovementService{

  async create(data){
    
    return await movementDao.create(data);
  }
}

export const movementService = new MovementService();