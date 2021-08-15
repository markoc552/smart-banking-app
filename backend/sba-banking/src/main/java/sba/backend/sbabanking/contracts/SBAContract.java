package sba.backend.sbabanking.contracts;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
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
public class SBAContract extends Contract {
    public static final String BINARY = "0x606060405234156200001057600080fd5b60405162001ae338038062001ae3833981016040528080519060200190919080518201919060200180518201919060200180518201919050506200005362000193565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506080604051908101604052808581526020018481526020018381526020018673ffffffffffffffffffffffffffffffffffffffff16815250905080600260008081526020019081526020016000206000820151816000019080519060200190620000ff929190620001ea565b5060208201518160010190805190602001906200011e929190620001ea565b5060408201518160020190805190602001906200013d929190620001ea565b5060608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050505050505050620002ad565b608060405190810160405280620001a962000271565b8152602001620001b862000271565b8152602001620001c762000271565b8152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200022d57805160ff19168380011785556200025e565b828001600101855582156200025e579182015b828111156200025d57825182559160200191906001019062000240565b5b5090506200026d919062000285565b5090565b602060405190810160405280600081525090565b620002aa91905b80821115620002a65760008160009055506001016200028c565b5090565b90565b61182680620002bd6000396000f300606060405236156100a2576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632b33d71b146100a75780632e7700f0146100de57806339c70dd6146101075780634edc2b111461017d5780635742177c1461018757806365209e3d1461022b5780637bae08ba1461026d578063832880e7146102d7578063e78a27ca14610470578063ee4ae2c914610499575b600080fd5b6100dc600480803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104d0565b005b34156100e957600080fd5b6100f1610723565b6040518082815260200191505060405180910390f35b341561011257600080fd5b61017b600480803561ffff1690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803560ff1690602001909190505061073e565b005b61018561092e565b005b341561019257600080fd5b6101a86004808035906020019091905050610acf565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815260200194505050505060405180910390f35b341561023657600080fd5b61026b600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610b96565b005b341561027857600080fd5b610280610ce9565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156102c35780820151818401526020810190506102a8565b505050509050019250505060405180910390f35b34156102e257600080fd5b6102ea610d7d565b604051808060200180602001806020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001848103845288818151815260200191508051906020019080838360005b83811015610364578082015181840152602081019050610349565b50505050905090810190601f1680156103915780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b838110156103ca5780820151818401526020810190506103af565b50505050905090810190601f1680156103f75780820380516001836020036101000a031916815260200191505b50848103825286818151815260200191508051906020019080838360005b83811015610430578082015181840152602081019050610415565b50505050905090810190601f16801561045d5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b341561047b57600080fd5b610483610ff2565b6040518082815260200191505060405180910390f35b6104ce600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611011565b005b6104d8611208565b6002600080815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561054857600080fd5b6080604051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200142815260200184815250905080600160006105a6610723565b815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301559050506000601481819054906101000a900461ffff168092919060010191906101000a81548161ffff021916908361ffff160217905550503373ffffffffffffffffffffffffffffffffffffffff1660007f49c30a7bc60a046e9da9892d5f2743ea0527d4327646cfc5562a1d1c46c654a3346040518082815260200191505060405180910390a38173ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f19350505050151561071e57600080fd5b505050565b60008060149054906101000a900461ffff1661ffff16905090565b60006002600080815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107b057600080fd5b6002600080815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168385846107f261125d565b808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018461ffff1661ffff1681526020018360ff168152602001828103825285818151815260200191508051906020019080838360005b8381101561087857808201518184015260208101905061085d565b50505050905090810190601f1680156108a55780820380516001836020036101000a031916815260200191505b5095505050505050604051809103906000f08015156108c357600080fd5b9050600380548060010182816108d9919061126d565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050565b610936611208565b6080604051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020014281526020013481525090508060016000610994610723565b815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301559050506000601481819054906101000a900461ffff168092919060010191906101000a81548161ffff021916908361ffff160217905550503373ffffffffffffffffffffffffffffffffffffffff1660007f49c30a7bc60a046e9da9892d5f2743ea0527d4327646cfc5562a1d1c46c654a3346040518082815260200191505060405180910390a350565b600080600080600080600080600160008a815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169350600160008a815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250600160008a8152602001908152602001600020600201549150600160008a8152602001908152602001600020600301549050838383839750975097509750505050509193509193565b610b9e611208565b6080604051908101604052808473ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020014281526020018381525090508060016000610bfc610723565b815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301559050506000601481819054906101000a900461ffff168092919060010191906101000a81548161ffff021916908361ffff16021790555050505050565b610cf1611299565b6003805480602002602001604051908101604052809291908181526020018280548015610d7357602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610d29575b5050505050905090565b610d856112ad565b610d8d6112ad565b610d956112ad565b60006002600080815260200190815260200160002060000160026000808152602001908152602001600020600101600260008081526020019081526020016000206002016002600080815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16838054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ea55780601f10610e7a57610100808354040283529160200191610ea5565b820191906000526020600020905b815481529060010190602001808311610e8857829003601f168201915b50505050509350828054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f415780601f10610f1657610100808354040283529160200191610f41565b820191906000526020600020905b815481529060010190602001808311610f2457829003601f168201915b50505050509250818054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610fdd5780601f10610fb257610100808354040283529160200191610fdd565b820191906000526020600020905b815481529060010190602001808311610fc057829003601f168201915b50505050509150935093509350935090919293565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b611019611208565b8273ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050151561105957600080fd5b6080604051908101604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff16815260200142815260200183815250905080600160006110b6610723565b815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301559050506000601481819054906101000a900461ffff168092919060010191906101000a81548161ffff021916908361ffff160217905550503373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f49c30a7bc60a046e9da9892d5f2743ea0527d4327646cfc5562a1d1c46c654a3346040518082815260200191505060405180910390a3505050565b608060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b604051610514806112e783390190565b8154818355818115116112945781836000526020600020918201910161129391906112c1565b5b505050565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b6112e391905b808211156112df5760008160009055506001016112c7565b5090565b9056006060604052341561000f57600080fd5b60405161051438038061051483398101604052808051906020019091908051820191906020018051906020019091908051906020019091905050836000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600060146101000a81548161ffff021916908361ffff1602179055508060018190555082600290805190602001906100c39291906100cd565b5050505050610172565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061010e57805160ff191683800117855561013c565b8280016001018555821561013c579182015b8281111561013b578251825591602001919060010190610120565b5b509050610149919061014d565b5090565b61016f91905b8082111561016b576000816000905550600101610153565b5090565b90565b610393806101816000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631ff8eda814610053578063cb2abf51146100fe578063d93d10ae1461012c57600080fd5b341561005e57600080fd5b610066610136565b604051808561ffff1661ffff16815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156100c05780820151818401526020810190506100a5565b50505050905090810190601f1680156100ed5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b61012a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061021b565b005b610134610275565b005b60008060006101436102d8565b600060149054906101000a900461ffff163073ffffffffffffffffffffffffffffffffffffffff16316001546002808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102065780601f106101db57610100808354040283529160200191610206565b820191906000526020600020905b8154815290600101906020018083116101e957829003601f168201915b50505050509050935093509350935090919293565b8073ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050151561027257600080fd5b50565b61027d6102ec565b6040805190810160405280428152602001348152509050600380548060010182816102a89190610306565b91600052602060002090600202016000839091909150600082015181600001556020820151816001015550505050565b602060405190810160405280600081525090565b604080519081016040528060008152602001600081525090565b815481835581811511610333576002028160020283600052602060002091820191016103329190610338565b5b505050565b61036491905b808211156103605760008082016000905560018201600090555060020161033e565b5090565b905600a165627a7a72305820c93df7301ba5c685317c81b1d53b6a8325469b0541611dd23ac25486ad42e3080029a165627a7a72305820f83ec8785dd7e16aefde19c062f0939f40d933700c470c37c904d9da88306f7e0029";

    public static final String FUNC_GETUSER = "getUser";

    public static final String FUNC_CREATEWAULT = "createWault";

    public static final String FUNC_GETWAULTS = "getWaults";

    public static final String FUNC_SENDMONEY = "sendMoney";

    public static final String FUNC_GETTRANSACTIONCOUNT = "getTransactionCount";

    public static final String FUNC_ADDMONEYTOACCOUNT = "addMoneyToAccount";

    public static final String FUNC_ADDSENDERTOTRANSACTIONS = "addSenderToTransactions";

    public static final String FUNC_GETTRANSACTIONS = "getTransactions";

    public static final String FUNC_GETMONEYSTATUS = "getMoneyStatus";

    public static final String FUNC_WITHDRAWMONEY = "withDrawMoney";

    public static final Event SENDTRANSACTION_EVENT = new Event("SendTransaction", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected SBAContract(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected SBAContract(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected SBAContract(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected SBAContract(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<SendTransactionEventResponse> getSendTransactionEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(SENDTRANSACTION_EVENT, transactionReceipt);
        ArrayList<SendTransactionEventResponse> responses = new ArrayList<SendTransactionEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            SendTransactionEventResponse typedResponse = new SendTransactionEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.recepient = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.sender = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<SendTransactionEventResponse> sendTransactionEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, SendTransactionEventResponse>() {
            @Override
            public SendTransactionEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(SENDTRANSACTION_EVENT, log);
                SendTransactionEventResponse typedResponse = new SendTransactionEventResponse();
                typedResponse.log = log;
                typedResponse.recepient = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.sender = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<SendTransactionEventResponse> sendTransactionEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(SENDTRANSACTION_EVENT));
        return sendTransactionEventFlowable(filter);
    }

    public RemoteFunctionCall<Tuple4<String, String, String, String>> getUser() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETUSER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Address>() {}));
        return new RemoteFunctionCall<Tuple4<String, String, String, String>>(function,
                new Callable<Tuple4<String, String, String, String>>() {
                    @Override
                    public Tuple4<String, String, String, String> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<String, String, String, String>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (String) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> createWault(BigInteger moneyToSave, String reason, BigInteger timeline) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_CREATEWAULT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint16(moneyToSave), 
                new org.web3j.abi.datatypes.Utf8String(reason), 
                new org.web3j.abi.datatypes.generated.Uint256(timeline)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<List> getWaults() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETWAULTS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Address>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> sendMoney(String recepient, BigInteger amount, BigInteger weiValue) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SENDMONEY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(recepient), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    public RemoteFunctionCall<BigInteger> getTransactionCount() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETTRANSACTIONCOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> addMoneyToAccount(BigInteger weiValue) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_ADDMONEYTOACCOUNT, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    public RemoteFunctionCall<TransactionReceipt> addSenderToTransactions(String _address, BigInteger amount) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_ADDSENDERTOTRANSACTIONS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_address), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple4<String, String, BigInteger, BigInteger>> getTransactions(BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETTRANSACTIONS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(index)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple4<String, String, BigInteger, BigInteger>>(function,
                new Callable<Tuple4<String, String, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple4<String, String, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<String, String, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<BigInteger> getMoneyStatus() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETMONEYSTATUS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> withDrawMoney(BigInteger _amount, String authority, BigInteger weiValue) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_WITHDRAWMONEY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_amount), 
                new org.web3j.abi.datatypes.Address(authority)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    @Deprecated
    public static SBAContract load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new SBAContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static SBAContract load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new SBAContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static SBAContract load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new SBAContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static SBAContract load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new SBAContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<SBAContract> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider, String user, String firstName, String lastName, String email) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(user), 
                new org.web3j.abi.datatypes.Utf8String(firstName), 
                new org.web3j.abi.datatypes.Utf8String(lastName), 
                new org.web3j.abi.datatypes.Utf8String(email)));
        return deployRemoteCall(SBAContract.class, web3j, credentials, contractGasProvider, BINARY, encodedConstructor);
    }

    public static RemoteCall<SBAContract> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider, String user, String firstName, String lastName, String email) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(user), 
                new org.web3j.abi.datatypes.Utf8String(firstName), 
                new org.web3j.abi.datatypes.Utf8String(lastName), 
                new org.web3j.abi.datatypes.Utf8String(email)));
        return deployRemoteCall(SBAContract.class, web3j, transactionManager, contractGasProvider, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<SBAContract> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String user, String firstName, String lastName, String email) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(user), 
                new org.web3j.abi.datatypes.Utf8String(firstName), 
                new org.web3j.abi.datatypes.Utf8String(lastName), 
                new org.web3j.abi.datatypes.Utf8String(email)));
        return deployRemoteCall(SBAContract.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<SBAContract> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String user, String firstName, String lastName, String email) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(user), 
                new org.web3j.abi.datatypes.Utf8String(firstName), 
                new org.web3j.abi.datatypes.Utf8String(lastName), 
                new org.web3j.abi.datatypes.Utf8String(email)));
        return deployRemoteCall(SBAContract.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static class SendTransactionEventResponse extends BaseEventResponse {
        public String recepient;

        public String sender;

        public BigInteger amount;
    }
}
