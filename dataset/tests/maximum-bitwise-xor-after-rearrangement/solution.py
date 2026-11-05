def maxBitwiseXor(s: str, t: str) -> str:
    ones = t.count('1')
    zeros = len(t) - ones
    res = []
    for c in s:
        if c == '0':
            if ones > 0:
                res.append('1')
                ones -= 1
            else:
                res.append('0')
                zeros -= 1
        else:
            if zeros > 0:
                res.append('1')
                zeros -= 1
            else:
                res.append('0')
                ones -= 1
    return "".join(res)