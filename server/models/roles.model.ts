// eslint-disable-next-line max-len
import mongoose, { Document, Model, Schema/* , SchemaOptions */ } from "mongoose";

export interface IRoles extends Document {
  name: "user" | "moderator" | "admin";
};

export interface IRolesModel {};// ? what is this?

/**
 * RolesModel
 */
class RolesModel {
  private model!: Model<IRoles>;

  private static instance: RolesModel;

  // eslint-disable-next-line require-jsdoc
  private constructor() {
    this.init();
  }

  // eslint-disable-next-line require-jsdoc
  private init(): void {
    const schemaDefinition = {
      name: { type: String, default: "user", required: true },
    };
    // const schemaOptions: SchemaOptions = { timestamps: true };

    // const schema: Schema = new Schema(schemaDefinition, schemaOptions);
    const schema: Schema = new Schema(schemaDefinition);

    this.model = mongoose.model<IRoles>("Roles", schema);
  }

  /**
   * @return {Model<IRoles>}
   */
  public static getModel(): Model<IRoles> {
    if (!this.instance) {
      this.instance = new RolesModel();
    }
    return this.instance.model;
  }
}

export default RolesModel;
