class Solution:
    def losingPlayer(self, x: int, y: int) -> str:
        rounds = min(x, y // 4)
        return "Alice" if rounds % 2 == 1 else "Bob"