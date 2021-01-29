import mongoose, { Document, Model, Schema, SchemaOptions } from "mongoose";

export interface ITutorials extends Document {
  title: string,
  description: string,
  published: boolean,
};

export interface ITutorialsModel {};// ? what is this?

/**
 * TutorialsModel
 */
class TutorialsModel {
  private model!: Model<ITutorials>;

  // eslint-disable-next-line require-jsdoc
  public constructor() {
    this.init();
  }

  // eslint-disable-next-line require-jsdoc
  private init(): void {
    const schemaDefinition = {
      title: { type: String, required: true },
      description: { type: String, required: true },
      published: { type: Boolean, required: true },
    };
    const schemaOptions: SchemaOptions = { timestamps: true };

    const schema: Schema = new Schema(schemaDefinition, schemaOptions);

    this.model = mongoose.model<ITutorials>("Tutorials", schema);
  }

  /**
   * @return {Model<ITutorials>}
   */
  public getModel(): Model<ITutorials> {
    return this.model;
  }
}

export default TutorialsModel;
