export interface ICommand
{
    Execute():Promise<void>
    Undo(): Promise<void>
}