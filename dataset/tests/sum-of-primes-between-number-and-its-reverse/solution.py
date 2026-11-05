def sumOfPrimes(n: int) -> int:
    r = int(str(n)[::-1])
    low = min(n, r)
    high = max(n, r)
    
    def is_prime(x: int) -> bool:
        if x < 2:
            return False
        if x == 2 or x == 3:
            return True
        if x % 2 == 0 or x % 3 == 0:
            return False
        i = 5
        while i * i <= x:
            if x % i == 0 or x % (i + 2) == 0:
                return False
            i += 6
        return True

    ans = 0
    for num in range(low, high + 1):
        if is_prime(num):
            ans += num
    return ans