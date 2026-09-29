const EVENT_METHODS = [
  'addParameterWithString',
  'addParameterWithInt',
  'addParameterWithDouble',
  'addParameterWithBoolean',
  'addParameterWithDate',
  'addParameterWithArray',
];

const PRODUCT_METHODS = [
  'setColor',
  'setVoucherName',
  'setVoucherDiscount',
  'setPromotionName',
  'setPromotionDiscount',
  'setSize',
  'setSalePrice',
  'setShippingCost',
  'setQuantity',
  'setStock',
  'setCustomAttributeWithString',
  'setCustomAttributeWithInt',
  'setCustomAttributeWithDouble',
  'setCustomAttributeWithBoolean',
  'setCustomAttributeWithDate',
  'setCustomAttributeWithArray',
];

const USER_METHODS = [
  'setName',
  'setSurname',
  'setAge',
  'setGender',
  'setBirthday',
  'setEmailOptin',
  'setSMSOptin',
  'setPushOptin',
  'setLocationOptin',
  'setFacebookID',
  'setTwitterID',
  'setLanguage',
  'setLocale',
];

function chainable(methods, extra) {
  const builder = { ...extra };
  methods.forEach((method) => {
    builder[method] = jest.fn(() => builder);
  });
  return builder;
}

// The real SDK hands out one shared user instance.
const currentUser = chainable(USER_METHODS, { login: jest.fn(), logout: jest.fn() });

const RNInsider = {
  init: jest.fn(),
  registerWithQuietPermission: jest.fn(),
  setActiveForegroundPushView: jest.fn(),
  startTrackingGeofence: jest.fn(),
  enableIDFACollection: jest.fn(),
  enableIpCollection: jest.fn(),
  enableLocationCollection: jest.fn(),
  enableCarrierCollection: jest.fn(),
  tagEvent: jest.fn((name) => chainable(EVENT_METHODS, { name, build: jest.fn() })),
  createNewProduct: jest.fn((productID, name, taxonomy, imageURL, price, currency) =>
    chainable(PRODUCT_METHODS, { productID, name, taxonomy, imageURL, price, currency })
  ),
  getCurrentUser: jest.fn(() => currentUser),
  setGDPRConsent: jest.fn(),
  itemPurchased: jest.fn(),
  itemAddedToCart: jest.fn(),
  itemRemovedFromCart: jest.fn(),
  cartCleared: jest.fn(),
  getMessageCenterData: jest.fn(),
  getSmartRecommendation: jest.fn(),
  getSmartRecommendationWithProduct: jest.fn(),
  getSmartRecommendationWithProductIDs: jest.fn(),
  clickSmartRecommendationProduct: jest.fn(),
  getContentStringWithName: jest.fn(),
  getContentBoolWithName: jest.fn(),
  getContentIntWithName: jest.fn(),
  visitHomePage: jest.fn(),
  visitListingPage: jest.fn(),
  visitCartPage: jest.fn(),
  visitProductDetailPage: jest.fn(),
};

module.exports = {
  __esModule: true,
  default: RNInsider,
  EVENT_METHODS,
  PRODUCT_METHODS,
  USER_METHODS,
};
