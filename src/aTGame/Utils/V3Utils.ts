/**
 * 关于v3向量的工具
 */
export default class V3Utils {
    /**
     * 通过一个字符串构建v3向量
     * @param str 
     */
    public static parseVector3(str: string): Laya.Vector3 {
        var strs = str.split(',');
        return new Laya.Vector3(Number(strs[0]), Number(strs[1]), Number(strs[2]));
    }

    /**
     * 设置V3向量长度
     * @param _v3 目标向量
     * @param _l 目标长度
     */
    public static setV3Length(_v3: Laya.Vector3, _l: number) {
        let _a: number = _l / Laya.Vector3.scalarLength(_v3);
        _v3.x = _v3.x * _a;
        _v3.y = _v3.y * _a;
        _v3.z = _v3.z * _a;
    }

    /**
     * 一个点插值移动到另一个点
     * @param _pos 当前点
     * @param _tragetPot 目标点
     * @param _lerp 插值移动比例
     * @param _outV3 输出向量
     * @param _initialLength 初始长度
     */
    public static PotLerpMove(_pos: Laya.Vector3, _tragetPot: Laya.Vector3, _lerp: number, _outV3: Laya.Vector3, _initialLength: number): number {
        if (!_outV3) {
            console.error('必须有一个输出的向量！');
            return;
        }
        //
        let _distance: number = Laya.Vector3.distance(_pos, _tragetPot);
        //
        Laya.Vector3.lerp(_pos, _tragetPot, _lerp, _outV3);
        //返回进度
        return 1 - (_distance / _initialLength);
    }

    /**
     * 一个点匀速移动到另一个点
     * @param _pos 当前点
     * @param _tragetPot 目标点
     * @param _speed 速度
     * @param _outV3 输出向量
     */
    public static PotConstantSpeedMove(_pos: Laya.Vector3, _tragetPot: Laya.Vector3, _speed: number, _outV3: Laya.Vector3): boolean {
        if (!_outV3) {
            console.error('必须有一个输出的向量！');
            return;
        }
        //
        let _ifEnd: boolean;
        let _differV3: Laya.Vector3 = new Laya.Vector3();
        //
        Laya.Vector3.subtract(_tragetPot, _pos, _differV3);
        let _distance: number = Laya.Vector3.scalarLength(_differV3);
        if (_distance > _speed) {
            this.setV3Length(_differV3, _speed);
            _ifEnd = false;
        } else {
            _ifEnd = true;
        }
        //相加
        Laya.Vector3.add(_pos, _differV3, _outV3);
        //
        return _ifEnd;
    }
}