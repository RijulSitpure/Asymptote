class Solution:
    def sumFourDivisors(self, nums: list[int]) -> int:
        total_sum = 0
        for x in nums:
            divs = []
            d = 1
            while d * d <= x:
                if x % d == 0:
                    divs.append(d)
                    if d * d != x:
                        divs.append(x // d)
                if len(divs) > 4:
                    break
                d += 1
            if len(divs) == 4:
                total_sum += sum(divs)
        return total_sum

def test():
    sol = Solution()
    assert sol.sumFourDivisors([21,4,7]) == 32, "test 1 failed"
    assert sol.sumFourDivisors([21,21]) == 64, "test 2 failed"
    assert sol.sumFourDivisors([1,2,3,4,5]) == 0, "test 3 failed"
    print("✓ four-divisors passed")

if __name__ == "__main__":
    test()
