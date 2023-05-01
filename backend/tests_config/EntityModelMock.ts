export default class EntityModelMock {
  public userId: string;
  public id: string;
  public body: any;

  constructor(props: any) {
    const { userId, id, ...body } = props;
    this.userId = userId;
    this.id = id;
    this.body = body;
  }

  toPublicJson() {
    return {
      userId: this.userId,
      id: this.id,
      ...this.body,
    };
  }

  async getById(): Promise<any> {
    return {
      Item: {},
    };
  }

  async getByUser(): Promise<any> {
    return {
      Item: {},
    };
  }

  static async getAll(): Promise<any> {
    return {
      Items: [],
    };
  }

  async delete(): Promise<any> {}

  async save() {
    return {
      userId: this.userId,
      ...this.body,
    };
  }

  async update() {
    return {
      userId: this.userId,
      ...this.body,
    };
  }
}
