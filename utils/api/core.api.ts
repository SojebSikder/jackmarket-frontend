/**
 * Core api interface
 */
export interface CoreApiInterface {
  /**
   * Find all data
   */
  findAll(): any;
  /**
   * Find single data
   */
  findOne(id: number): any;
  /**
   * Create data
   */
  create(data: any): any;
  /**
   * Update data
   */
  update(id: number, data: any): any;
  /**
   * Delete data
   */
  delete(id: number): any;
}
