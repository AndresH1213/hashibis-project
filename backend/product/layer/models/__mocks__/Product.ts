import EntityModelMock from '../../../../tests_config/EntityModelMock';

class Product extends EntityModelMock {
  constructor(props: any) {
    super(props);
  }

  private static getTableName() {}

  static async queryByIndex({ category }: { category: string }): Promise<any> {}

  static async handleQuery({ limit, lastEvaluatedKey, category }) {
    if (category) {
      return await this.queryByIndex({ category });
    }
    const LEKObj = lastEvaluatedKey && JSON.parse(lastEvaluatedKey);
    return await EntityModelMock.getAll();
  }
}

export default Product;
