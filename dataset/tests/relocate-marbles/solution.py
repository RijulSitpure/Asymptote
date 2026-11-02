class Solution:
    def relocateMarbles(self, nums: list[int], moveFrom: list[int], moveTo: list[int]) -> list[int]:
        pos = set(nums)
        for u, v in zip(moveFrom, moveTo):
            if u in pos:
                pos.remove(u)
                pos.add(v)
        return sorted(pos)
