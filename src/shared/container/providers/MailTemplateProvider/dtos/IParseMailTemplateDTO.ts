interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  fileTemplate: string;
  variables: ITemplateVariables;
}
