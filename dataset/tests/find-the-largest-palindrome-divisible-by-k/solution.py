class Solution:
    def largestPalindrome(self, n: int, k: int) -> str:
        if k == 1:
            return "9" * n
        if k == 2:
            if n == 1: return "8"
            return "8" + "9" * (n - 2) + "8"
        if k == 3:
            return "9" * n
        if k == 4:
            if n <= 4:
                return "8" * n
            return "88" + "9" * (n - 4) + "88"
        if k == 5:
            if n == 1: return "5"
            return "5" + "9" * (n - 2) + "5"
        if k == 6:
            if n == 1: return "6"
            if n == 2: return "66"
            if n % 2 == 1:
                mid = n // 2
                return "8" + "9" * (mid - 1) + "8" + "9" * (mid - 1) + "8"
            else:
                mid = (n - 2) // 2
                return "8" + "9" * (mid - 1) + "77" + "9" * (mid - 1) + "8"
        if k == 7:
            if n == 1: return "7"
            if n == 2: return "77"
            # Greedy search on center digits
            half = (n + 1) // 2
            # powers of 10 mod 7
            pow10 = [1] * n
            for i in range(1, n):
                pow10[i] = (pow10[i - 1] * 10) % 7
            ans = ['9'] * n
            # If n is odd, center is n // 2
            # If n is even, centers are n // 2 - 1 and n // 2
            if n % 2 == 1:
                mid = n // 2
                for d in range(9, -1, -1):
                    ans[mid] = str(d)
                    val = 0
                    for i in range(n):
                        val = (val + int(ans[i]) * pow10[n - 1 - i]) % 7
                    if val == 0:
                        return "".join(ans)
            else:
                m1, m2 = n // 2 - 1, n // 2
                for d in range(9, -1, -1):
                    ans[m1] = ans[m2] = str(d)
                    val = 0
                    for i in range(n):
                        val = (val + int(ans[i]) * pow10[n - 1 - i]) % 7
                    if val == 0:
                        return "".join(ans)
        if k == 8:
            if n <= 6:
                return "8" * n
            return "888" + "9" * (n - 6) + "888"
        if k == 9:
            return "9" * n
        return ""
