class AuthenticationManager:
    def __init__(self, timeToLive: int):
        self.ttl = timeToLive
        self.tokens = {}

    def generate(self, tokenId: str, currentTime: int) -> None:
        self.tokens[tokenId] = currentTime + self.ttl

    def renew(self, tokenId: str, currentTime: int) -> None:
        if tokenId in self.tokens and self.tokens[tokenId] > currentTime:
            self.tokens[tokenId] = currentTime + self.ttl

    def countUnexpiredTokens(self, currentTime: int) -> int:
        return sum(1 for exp in self.tokens.values() if exp > currentTime)

def test_auth_manager():
    mgr = AuthenticationManager(5)
    mgr.renew("aaa", 1)
    mgr.generate("aaa", 2)
    assert mgr.countUnexpiredTokens(6) == 1
    mgr.generate("bbb", 7)
    mgr.renew("aaa", 8)
    mgr.renew("bbb", 10)
    assert mgr.countUnexpiredTokens(15) == 0

