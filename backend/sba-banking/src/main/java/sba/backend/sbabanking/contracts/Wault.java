package sba.backend.sbabanking.contracts;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint16;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.4.1.
 */
@SuppressWarnings("rawtypes")
public class Wault extends Contract {
    public static final String BINARY = "0x6060604052341561000f57600080fd5b60405161051438038061051483398101604052808051906020019091908051820191906020018051906020019091908051906020019091905050836000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600060146101000a81548161ffff021916908361ffff1602179055508060018190555082600290805190602001906100c39291906100cd565b5050505050610172565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061010e57805160ff191683800117855561013c565b8280016001018555821561013c579182015b8281111561013b578251825591602001919060010190610120565b5b509050610149919061014d565b5090565b61016f91905b8082111561016b576000816000905550600101610153565b5090565b90565b610393806101816000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631ff8eda814610053578063cb2abf51146100fe578063d93d10ae1461012c57600080fd5b341561005e57600080fd5b610066610136565b604051808561ffff1661ffff16815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156100c05780820151818401526020810190506100a5565b50505050905090810190601f1680156100ed5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b61012a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061021b565b005b610134610275565b005b60008060006101436102d8565b600060149054906101000a900461ffff163073ffffffffffffffffffffffffffffffffffffffff16316001546002808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102065780601f106101db57610100808354040283529160200191610206565b820191906000526020600020905b8154815290600101906020018083116101e957829003601f168201915b50505050509050935093509350935090919293565b8073ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050151561027257600080fd5b50565b61027d6102ec565b6040805190810160405280428152602001348152509050600380548060010182816102a89190610306565b91600052602060002090600202016000839091909150600082015181600001556020820151816001015550505050565b602060405190810160405280600081525090565b604080519081016040528060008152602001600081525090565b815481835581811511610333576002028160020283600052602060002091820191016103329190610338565b5b505050565b61036491905b808211156103605760008082016000905560018201600090555060020161033e565b5090565b905600a165627a7a72305820c93df7301ba5c685317c81b1d53b6a8325469b0541611dd23ac25486ad42e3080029";

    public static final String FUNC_GETWAULTSTATUS = "getWaultStatus";

    public static final String FUNC_SENDMONEYTOWAULT = "sendMoneyToWault";

    public static final String FUNC_WITHDRAWMONEY = "withDrawMoney";

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected Wault(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Wault(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Wault(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Wault(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<Tuple4<BigInteger, BigInteger, BigInteger, String>> getWaultStatus() {
        final Function function = new Function(FUNC_GETWAULTSTATUS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint16>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Utf8String>() {}));
        return new RemoteFunctionCall<Tuple4<BigInteger, BigInteger, BigInteger, String>>(function,
                new Callable<Tuple4<BigInteger, BigInteger, BigInteger, String>>() {
                    @Override
                    public Tuple4<BigInteger, BigInteger, BigInteger, String> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<BigInteger, BigInteger, BigInteger, String>(
                                (BigInteger) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (String) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> sendMoneyToWault(BigInteger weiValue) {
        final Function function = new Function(
                FUNC_SENDMONEYTOWAULT, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    public RemoteFunctionCall<TransactionReceipt> withDrawMoney(String authority, BigInteger weiValue) {
        final Function function = new Function(
                FUNC_WITHDRAWMONEY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(authority)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    @Deprecated
    public static Wault load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Wault(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Wault load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Wault(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Wault load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Wault(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Wault load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Wault(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Wault> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider, String _address, String reason, BigInteger moneyToSave, BigInteger timeline) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_address), 
                new org.web3j.abi.datatypes.Utf8String(reason), 
                new org.web3j.abi.datatypes.generated.Uint16(moneyToSave), 
                new org.web3j.abi.datatypes.generated.Uint256(timeline)));
        return deployRemoteCall(Wault.class, web3j, credentials, contractGasProvider, BINARY, encodedConstructor);
    }

    public static RemoteCall<Wault> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider, String _address, String reason, BigInteger moneyToSave, BigInteger timeline) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_address), 
                new org.web3j.abi.datatypes.Utf8String(reason), 
                new org.web3j.abi.datatypes.generated.Uint16(moneyToSave), 
                new org.web3j.abi.datatypes.generated.Uint256(timeline)));
        return deployRemoteCall(Wault.class, web3j, transactionManager, contractGasProvider, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<Wault> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String _address, String reason, BigInteger moneyToSave, BigInteger timeline) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_address), 
                new org.web3j.abi.datatypes.Utf8String(reason), 
                new org.web3j.abi.datatypes.generated.Uint16(moneyToSave), 
                new org.web3j.abi.datatypes.generated.Uint256(timeline)));
        return deployRemoteCall(Wault.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<Wault> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String _address, String reason, BigInteger moneyToSave, BigInteger timeline) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_address), 
                new org.web3j.abi.datatypes.Utf8String(reason), 
                new org.web3j.abi.datatypes.generated.Uint16(moneyToSave), 
                new org.web3j.abi.datatypes.generated.Uint256(timeline)));
        return deployRemoteCall(Wault.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }
}
