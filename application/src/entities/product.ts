import { Money } from "./valueObjects/money";
import { Category } from "./valueObjects/category";

export class Product {
  private id: number;
  private name: string;
  private description: string;
  private category: Category;
  private price: Money;
  private active: boolean;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor(
    name: string,
    category: string,
    description: string,
    price: number,
    active: boolean
  ) {
    this.name = name;
    this.category = new Category(category);
    this.description = description;
    this.price = new Money(price);
    this.active = active;
  }

  static New(
    id: number,
    name: string,
    description: string,
    category: string,
    price: number,
    active: boolean,
    created_at?: Date,
    updated_at?: Date
  ): Product {
    const p = new Product(name, category, description, price, active);
    p.id = id;
    p.active = active;
    p.createdAt = created_at;
    p.updatedAt = updated_at;
    return p;
  }

  public getValueProduct(): number {
    return this.price.getValueMoney();
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCategory(): string {
    return this.category.getCategory();
  }

  public setId(id: number) {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  getActive(): boolean {
    return this.active;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
