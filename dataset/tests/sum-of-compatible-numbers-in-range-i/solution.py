def sumOfCompatibleNumbers(left: int, right: int, d: int) -> int:
    first = ((left + d - 1) // d) * d
    last = (right // d) * d
    if first > last:
        return 0
    count = (last - first) // d + 1
    return count * (first + last) // 2