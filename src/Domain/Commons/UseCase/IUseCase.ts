export interface IUseCase<params, response>
{
    Execute(params : params) : Promise<response>
}