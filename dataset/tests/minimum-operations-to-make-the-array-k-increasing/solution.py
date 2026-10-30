import bisect

class Solution:
    def kIncreasing(self, arr: list[int], k: int) -> int:
        n = len(arr)
        total_ops = 0

        for i in range(k):
            chain = arr[i::k]
            tails = []
            for x in chain:
                idx = bisect.bisect_right(tails, x)
                if idx == len(tails):
                    tails.append(x)
                else:
                    tails[idx] = x
            total_ops += len(chain) - len(tails)

        return total_ops
