import { NativeModules } from 'react-native';

// The mock stands in for the SDK in every other suite; this suite pins it to the published package.
const mock = jest.requireMock<{
  default: Record<string, jest.Mock>;
  EVENT_METHODS: string[];
  PRODUCT_METHODS: string[];
  USER_METHODS: string[];
}>('react-native-insider');

function nativeModuleStub() {
  const fns: Record<string, jest.Mock> = {};
  return new Proxy(fns, {
    get: (target, key: string) => (target[key] ??= jest.fn()),
  });
}

describe('react-native-insider API used by the demo', () => {
  let RNInsider: any;

  beforeAll(() => {
    NativeModules.RNInsider = nativeModuleStub();
    NativeModules.RNNotificationHandler = { addListener: jest.fn(), removeListeners: jest.fn() };
    RNInsider = jest.requireActual('react-native-insider').default;
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each(Object.keys(mock.default))('RNInsider.%s is a function', (method) => {
    expect(typeof RNInsider[method]).toBe('function');
  });

  it.each([...mock.EVENT_METHODS, 'build'])('InsiderEvent.%s is a function', (method) => {
    expect(typeof RNInsider.tagEvent('api_check')[method]).toBe('function');
  });

  it.each(mock.EVENT_METHODS)('InsiderEvent.%s returns the event for chaining', (method) => {
    const event = RNInsider.tagEvent('api_check');

    expect(event[method]()).toBe(event);
  });

  it.each(mock.PRODUCT_METHODS)('InsiderProduct.%s returns the product for chaining', (method) => {
    const product = RNInsider.createNewProduct('id', 'name', ['taxonomy'], 'image', 1, 'USD');

    expect(typeof product[method]).toBe('function');
    expect(product[method]()).toBe(product);
  });

  it.each(mock.USER_METHODS)('InsiderUser.%s returns the user for chaining', (method) => {
    const user = RNInsider.getCurrentUser();

    expect(typeof user[method]).toBe('function');
    expect(user[method]()).toBe(user);
  });

  it('getCurrentUser returns one shared user with login and logout', () => {
    const user = RNInsider.getCurrentUser();

    expect(RNInsider.getCurrentUser()).toBe(user);
    expect(typeof user.login).toBe('function');
    expect(typeof user.logout).toBe('function');
  });

  it('InsiderIdentifier.addEmail stores the email the way the stub does', () => {
    const RealIdentifier = jest.requireActual('react-native-insider/src/InsiderIdentifier').default;
    const StubIdentifier = jest.requireMock('react-native-insider/src/InsiderIdentifier').default;

    expect(new RealIdentifier().addEmail('user@example.com').identifiers).toEqual(
      new StubIdentifier().addEmail('user@example.com').identifiers
    );
  });

  it('the InsiderCallbackType stub matches the published enum', () => {
    expect(jest.requireMock('react-native-insider/src/InsiderCallbackType').default).toEqual(
      jest.requireActual('react-native-insider/src/InsiderCallbackType').default
    );
  });
});
