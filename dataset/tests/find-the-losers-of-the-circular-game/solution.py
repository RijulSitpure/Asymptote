class Solution:
    def circularGameLosers(self, n: int, k: int) -> list[int]:
        visited = set()
        curr = 0
        i = 1
        while curr not in visited:
            visited.add(curr)
            curr = (curr + i * k) % n
            i += 1
        return [p + 1 for p in range(n) if p not in visited]
