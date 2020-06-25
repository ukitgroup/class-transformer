import { expect } from "chai";
import { plainToClass, ToInteger } from "../../src";

describe("Cast to integer", () => {
    class Dto {
        @ToInteger()
        int: number;
    }

    it("should cast real integer correctly", () => {
        const result = plainToClass(Dto, { int: 7 });
        expect(result.int).to.be.equals(7);
    });

    it("should cast number to integer", () => {
        const result = plainToClass(Dto, { int: 5.5 });
        expect(result.int).to.be.equals(5);
    });

    it("should cast string to integer", () => {
        const result = plainToClass(Dto, { int: "77" });
        expect(result.int).to.be.equals(77);
    });

    it("should not cast invalid string", () => {
        const result = plainToClass(Dto, { int: "asd" });
        expect(result.int).to.be.NaN;
    });

    it("should not cast invalid type", () => {
        const result = plainToClass(Dto, { int: {} });
        expect(result.int).to.be.NaN;
    });

    it("should cast to integer with default radix", () => {
        class DtoDefaultRadix {
            @ToInteger(10)
            int: number;
        }

        const result = plainToClass(DtoDefaultRadix, { int: "700" });
        expect(result.int).to.be.equals(700);
    });

    it("should cast to integer with non default radix", () => {
        class DtoNonDefaultRadix {
            @ToInteger(2)
            int: number;
        }

        const result = plainToClass(DtoNonDefaultRadix, { int: "111" });
        expect(result.int).to.be.equals(7);
    });
});
