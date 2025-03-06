export interface IUseCase<Input = void, Output = void> {
    execute: (data: Input) => Promise<Output>;
}
