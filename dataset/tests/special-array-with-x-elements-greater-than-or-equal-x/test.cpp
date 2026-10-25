#include <cassert>
#include <vector>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<int> n1 = {3, 5};
    assert(sol.specialArray(n1) == 2);
    std::vector<int> n2 = {0, 0};
    assert(sol.specialArray(n2) == -1);
    std::vector<int> n3 = {0, 4, 3, 0, 4};
    assert(sol.specialArray(n3) == 3);
    return 0;
}