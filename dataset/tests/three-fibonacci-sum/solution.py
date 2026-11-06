def isThreeFibonacciSum(n: int) -> bool:
    fibs = [1, 2]
    while fibs[-1] < n:
        fibs.append(fibs[-1] + fibs[-2])

    fib_set = set(fibs)
    m = len(fibs)

    for i in range(m):
        for j in range(i, m):
            rem = n - fibs[i] - fibs[j]
            if rem in fib_set and rem >= fibs[j]:
                return True
    return False