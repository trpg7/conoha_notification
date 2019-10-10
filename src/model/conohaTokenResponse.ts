interface Token {
  id: string;
}

interface Access {
  token: Token;
}

export interface ConohaTokenResponse {
  access: Access;
}
