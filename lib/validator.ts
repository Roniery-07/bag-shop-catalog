type Rule = (value: unknown) => true | string

abstract class BaseValidator<T>{
  protected rules : Rule[] = [];

  protected addRule(rule: Rule){
    this.rules.push(rule)
  }

  parse(value: unknown){
    for(const rule of this.rules ){
      const result = rule(value)
      if(result !== true){
        throw new Error(result)
      }
    }
    return value as T
  };
}

class StringValidator extends BaseValidator<string> {
  constructor(){
    super();
    this.addRule((val) => typeof val === 'string' || "Deve ser uma string!")
  }
}

class NumberValidator extends BaseValidator<number>{
  constructor(){
    super();
    this.addRule((val) => typeof val === 'number' || "Deve ser um número!")
  }
}



type ValidatorShape = Record<string, BaseValidator<any>>

type InferType <S extends ValidatorShape> = {
  [Key in keyof S] : S[Key] extends BaseValidator<infer U> ? U: never;
}

class ObjectValidator<S extends ValidatorShape> extends BaseValidator<InferType<S>>{
  private shape: S;
  constructor(shape: S){
    super();
    this.shape = shape
    this.addRule(val => {
      if(typeof val !== 'object' || val === null) return  "Deve ser um objeto!"
      return true;
    })
  }

  parse(data: unknown){
    super.parse(data)
    const result: any = {}
    const errors: string[] = []

    const typedData = data as Record<string, unknown>
    for(const key in this.shape){
      const validator = this.shape[key]
      const value = typedData[key]

      try{
        result[key] = validator.parse(value)
      }
      catch(err: any){
        errors.push(`${key}: ${err.message}`)
      }
    }
    if(errors.length > 0){
    throw new Error(errors.join(", "));
  }

  return result as InferType<S>;
  }
}

export const validator = {
  string : () => new StringValidator(),
  number: () => new NumberValidator(),
  object: <S extends ValidatorShape>(shape: S) => new ObjectValidator(shape)
}


export type Infer<T extends BaseValidator<any>> = T extends BaseValidator<infer U> ? U : never;

