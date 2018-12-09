import JsonRpc from '../src/JsonRPC'

const httpMock = {
  request: () => {}
}
const httpsMock = {
  request: () => {}
}

describe('JsonRpc', () => {
  it('should create rpc object', () => {
    const jsonRpc = new JsonRpc({
      host: 'localhost',
      port: 12345
    })
    expect(jsonRpc).toBeInstanceOf(JsonRpc)
  })
})
