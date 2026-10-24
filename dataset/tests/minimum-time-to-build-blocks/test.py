import heapq

class Solution:
    def minTimeToBuildBlocks(self, blocks: list[int], split: int) -> int:
        heapq.heapify(blocks)
        while len(blocks) > 1:
            _b1 = heapq.heappop(blocks)
            b2 = heapq.heappop(blocks)
            heapq.heappush(blocks, b2 + split)
        return blocks[0]

def test():
    sol = Solution()
    assert sol.minTimeToBuildBlocks([1, 2], 5) == 7, "test 1 failed"
    assert sol.minTimeToBuildBlocks([1, 2, 3], 1) == 4, "test 2 failed"
    print("✓ minimum-time-to-build-blocks passed")

if __name__ == "__main__":
    test()
