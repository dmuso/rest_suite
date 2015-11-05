/* @namespace NetsuiteToolkit */
var NetsuiteToolkit              = {};
NetsuiteToolkit.RecordProcessor  = {};
NetsuiteToolkit.SublistProcessor = {};

var lineItemMatchError = 'Unable to find matching line item with the given field.';
var malformedDataError  = 'Data for processing line items is malformed.';

/**
 * Requests a newly initialized record from NetSuite.
 *
 * @method
 * @param {string} recordType The String representing a record type
 * @memberof NetsuiteToolkit
 * @return {null}
 */
NetsuiteToolkit.createRecord = function(recordType) {
  return nlapiCreateRecord(recordType);
};

/**
 * Requests a record from NetSuite's database by id (internal_id in NetSuite parlance)
 *
 * @method
 * @param {string} recordType The String representing a record type
 * @param {string} interal_id  The String representing a NetSuite internal_id
 * @memberof NetsuiteToolkit
 * @return {null}
 */
NetsuiteToolkit.loadRecord = function(recordType, recordId) {
  return nlapiLoadRecord(recordType, recordId);
};

/**
 * Requests a record be deleted from NetSuite's database by id (internal_id in NetSuite parlance)
 *
 * @method
 * @param {string} recordType The String representing a record type
 * @param {string} interalid   The String representing a NetSuite internal_id
 * @memberof NetsuiteToolkit
 * @return {number} The number representing the internalid of the record deleted
 */
NetsuiteToolkit.deleteRecord = function(recordType, internalid) {
  return nlapiDeleteRecord(recordType, internalid);
};

/**
 * Requests a record from NetSuite's database by id (internal_id in NetSuite parlance)
 *
 * @method
 * @param {string} sourceType The String representing a source record type
 * @param {string} internalid  The String representing the internalid of the source record
 * @param {string} resultType The String representing a result record type
 * @param {object} values      The object containing set of values to be populated onto the
 *                             transformed record
 * @memberof NetsuiteToolkit
 * @return {null}
 */
NetsuiteToolkit.transformRecord = function(sourceType, internalid, resultType, values) {
  return nlapiTransformRecord(sourceType, internalid, resultType, values);
};

/**
 * Requests that Netsuite write a given record to it's database.
 *
 * @method
 * @param {nlobjRecord} record           The NetSuite record object
 * @param {boolean}     doSourcing      Enable or disable sourcing
 * @param {boolean}     ignoreMandatory Recognize or ignore mandatory fields
 * @memberof NetsuiteToolkit
 * @return {null}
 */
NetsuiteToolkit.submitRecord = function(record, doSourcing, ignoreMandatory) {
  doSourcing      = doSourcing      || false;
  ignoreMandatory = ignoreMandatory || false;
  return nlapiSubmitRecord(record, doSourcing, ignoreMandatory);
};

/**
* Mutates an arbitrary field value on a NetSuite record.
*
* @method
* @param {nlobjRecord} record     The NetSuite record object
* @param {string}      fieldName The String representing the field to mutate
* @param {value}       value      The String representing the value to replace
* @memberof NetsuiteToolkit
* @return {null}
*/
NetsuiteToolkit.setFieldValue = function(record, fieldName, value) {
  record.setFieldValue(fieldName, value);
};

/**
 * Fetches the line item count for a given NetSuite sublist.
 *
 * @method
 * @param {nlobjRecord} record       The NetSuite record object
 * @param {string}      sublistName The String representing the NetSuite sublist
 * @memberof NetsuiteToolkit
 * @return {number} The line item count for the sublist.
 */
NetsuiteToolkit.getLineItemCount = function(record, sublistName) {
  return record.getLineItemCount(sublistName);
};

/**
 * Fetched the value of a line item in a given sublist for a given field.
 *
 * @method
 * @param {nlobjRecord} record       The NetSuite record object
 * @param {string}      sublistName The String representing the NetSuite sublist
 * @param {number}      index        The Number of the sublist index
 * @param {string}      fieldName   The string representing the name of the field
 * @memberof NetsuiteToolkit
 * @return {number} The value of the filed on the given sublist at the given index
 */
NetsuiteToolkit.getLineItemValue = function(record, sublistName, index, fieldName) {
  return record.getLineItemValue(sublistName, index, fieldName);
};

/**
 * Mutates the value of a line item in a given sublist for a given field.
 *
 * @method
 * @param {nlobjRecord} record       The NetSuite record object
 * @param {string}      sublistName The String representing the NetSuite sublist
 * @param {number}      index        The Number of the sublist index
 * @param {string}      fieldName   The string representing the name of the field
 * @param {string}      value        The string representing the value of the field
 * @memberof NetsuiteToolkit
 * @return {null}
 */
NetsuiteToolkit.setLineItemValue = function(record, sublistName, fieldName, index, value) {
  record.setLineItemValue(sublistName, fieldName, index, value);
};

/**
 * Inserts a line item into a sublist on a given record.
 *
 * @method
 * @param {nlobjRecord} record       The NetsuiteRecord object
 * @param {string}      sublistName The String representing the NetSuite sublist on the record
 * @param {number}      index        The Number of the sublist index to be updated
 * @memberof NetsuiteToolkit
 * @return {null}
 */
NetsuiteToolkit.insertLineItem = function(record, sublistName, index) {
  record.insertLineItem(sublistName, index);
};

/**
 * Removes a line item at a given index for a given sublist field.
 *
 * @method
 * @param {nlobjRecord} record       The NetSuite record object
 * @param {string}      sublistName The string representing the name of the sublist field
 * @param {number}      index        The number of the sublist index
 * @memberof NetsuiteToolkit
 * @return {null}
 */
NetsuiteToolkit.removeLineItem = function(record, sublistName, index) {
  record.removeLineItem(sublistName, index);
};

/**
 * Removes a line item at a given index for a given sublist field.
 *
 * @method
 * @param {string} field  The string representing the name of the record field
 * @param {string} join   The name of a field to join
 * @param {string} value1 The string representing the value for comparison
 * @param {string} value2 The string representing the second value for comparison
 * @param
 * @memberof NetsuiteToolkit
 * @return {nlobjSearchFilter} A new instance of nlobjSearchFilter
 */
NetsuiteToolkit.searchFilter = function(field, join, value1, value2) {
  return (new nlobjSearchFilter(field, join, value1, value2));
};

/**
 * Removes a line item at a given index for a given sublist field.
 *
 * @method
 * @param {string} field   The string representing the name of the record field
 * @param {string} join    The name of a field to join
 * @param {string} summary The summary of the column
 * @param
 * @memberof NetsuiteToolkit
 * @return {nlobjSearchColumn} A new instance of nlobjSearchColumn
 */
NetsuiteToolkit.searchColumn = function(name, join, summary) {
  return (new nlobjSearchColumn(name, join, summary));
};

/**
 * Removes a line item at a given index for a given sublist field.
 *
 * @method
 * @param {string} recordType    The string representing the record type
 * @param {string} searchId      The string representing the search id
 * @param {array}  searchFilters The array containing a set on nlobjSearchFilter objects
 * @param {array}  searchColumns The array containing a set on nlobjSearchColumn objects
 * @param
 * @memberof NetsuiteToolkit
 * @return {array} The array containing the results of the search
 */
NetsuiteToolkit.searchRecord = function(recordType, searchId, searchFilters, searchColumns) {
  return nlapiSearchRecord(recordType, searchId, searchFilters, searchColumns);
};

/**
 * Removes a line item at a given index for a given sublist field.
 *
 * @method
 * @param {nlobjRecord} record An instance of nlobjRecord
 * @param
 * @memberof NetsuiteToolkit
 * @return {number} The number representing the record id
 */
NetsuiteToolkit.getIdFromRecord = function(record) {
  return record.getId();
};

/**
 * Returns a formatted reply object using a given set of params, result and possible exception
 *
 * @method
 * @param {object} params    The object holding the params of a request
 * @param {object} result    The object containing the result of the request
 * @param {error}  exception The error object of a raised exception
 * @memberof NetsuiteToolkit
 * @return {object} The formatted reply object
 */
NetsuiteToolkit.formatReply = function(params, result, exception) {
  reply = {};

  reply.params  = params;
  reply.result  = result;

  if (exception) {
    reply.exception = NetsuiteToolkit.formatException(exception);
    reply.success   = false;
  } else {
    reply.success = true;
  }

  return reply;
};

/**
 * Returns a formatted reply object based off of a given exception.
 *
 * @method
 * @param {error} exception The Error object of the given exception
 * @memberof NetsuiteToolkit
 * @return {object} The formatted reply object generated from the exception
 */
NetsuiteToolkit.formatException = function(exception) {
  var formattedException = {};

  formattedException.message = exception.message;

  try {
    formattedException.trace = exception.getStackTrace();
  } catch (stackFetchError) {
    formattedException.trace = stackFetchError.message;
  }

  return formattedException;
};

/** @namespace NetsuiteToolkit.RecordProcessor */

/**
 * Update literal fields on a given record with the given fieldData.
 *
 * @method
 * @param {nlobjRecord} record    The NetSuite record object
 * @param {object}      fieldData Data for literal fields
 * @memberof NetsuiteToolkit.RecordProcessor
 */
NetsuiteToolkit.RecordProcessor.updateLiterals = function(record, fieldData) {
  for (var fieldName in fieldData) {
    value = fieldData[fieldName];
    NetsuiteToolkit.setFieldValue(record, fieldName, value);
  }
};

/** @namespace NetsuiteToolkit.SublistProcessor */

/**
 * SublistProcessor Class
 * @class NetsuiteToolkit.SublistProcessor
 * @param {object} sublistData The object representing operations to be performed
 *                              on the sublist data
 * @return {SublistProcessor} The new instance of NetsuiteToolkit.SublistProcessor
 */
NetsuiteToolkit.SublistProcessor = (function() {

  /* @constructor */
  function SublistProcessor(record, sublistData) {
    this.record       = record;
    this.sublistName = sublistData.name;
    this.createList  = sublistData.create || [];
    this.updateList  = sublistData.update || [];
    this.exciseList  = sublistData.excise || [];
  }

  /**
   * Procedural function to execute all sublist operations on the given
   * record and sublist
   *
   * @method
   * @memberof NetsuiteToolkit.SublistProcessor
   */
  SublistProcessor.prototype.execute = function() {
    this.processCreations();
    this.processUpdates();
    this.processExcisions();
  };

  /**
   * Iterate over list of creation requests and execute them
   *
   * @method
   * @memberof NetsuiteToolkit.SublistProcessor
   */
  SublistProcessor.prototype.processCreations = function() {
    for (var index in this.createList) {
      createRequest = this.createList[index];
      this.createLineItem(createRequest);
    }
  };

  /**
   * Iterate over list of update requests and execute them
   *
   * @method
   * @memberof NetsuiteToolkit.SublistProcessor
   */
  SublistProcessor.prototype.processUpdates = function() {
    for (var index in this.updateList) {
      updateRequest = this.updateList[index];
      this.updateLineItem(updateRequest);
    }
  };

  /**
   * Iterate over list of excision requests and execute them
   *
   * @method
   * @memberof NetsuiteToolkit.SublistProcessor
   */
  SublistProcessor.prototype.processExcisions = function() {
    for (var index in this.exciseList) {
      exciseRequest = this.exciseList[index];
      this.exciseLineItem(exciseRequest);
    }
  };

  /**
   * Creates and alters the fields of a new line item using the
   * given params
   *
   * @method
   * @param {object} creationRequest The Object that hold a single creation
   *                                  request for a line item
   * @memberof NetsuiteToolkit.SublistProcessor
   */
  SublistProcessor.prototype.createLineItem = function(creationRequest) {
    index = creationRequest.index;
    data  = creationRequest.data;

    if (!index) {
      index = NetsuiteToolkit.getLineItemCount(this.record, this.sublistName);
    }
    NetsuiteToolkit.insertLineItem(this.record, this.sublistName, index);
    this.updateLineItemFields(index, data);
  };

  /**
   * Alters the fields of a line item using the given params
   *
   * @method
   * @param {object} updateRequest The Object that hold a single update
   *                                request for a line item
   * @memberof NetsuiteToolkit.SublistProcessor
   */
  SublistProcessor.prototype.updateLineItem = function(updateRequest) {
    index = updateRequest.index;
    match = updateRequest.match;
    data  = updateRequest.data;

    if (!index && !match) {
      throw NetsuiteToolkit.SublistProcessor.UnableToMatch;
    } else if (!index) {
      index = this.matchLineItemByField(match, data);
    }

    this.updateLineItemFields(index, data);
  };

  /**
   * Removes a line item using the given params
   *
   * @method
   * @param {object} exciseRequest The Object that hold a single excise
   *                                request for a line item
   * @memberof NetsuiteToolkit.SublistProcessor
   */
  SublistProcessor.prototype.exciseLineItem = function(exciseRequest) {
    index = exciseRequest.index;
    match = exciseRequest.match;
    data  = exciseRequest.data;

    if (!index && !match) {
      throw NetsuiteToolkit.SublistProcessor.UnableToMatch;
    } else if (!index) {
      index = this.matchLineItemByField(match, data);
    }

    NetsuiteToolkit.removeLineItem(this.record, this.sublistName, index);
  };

  /**
   * Updates all declared fields of a line item at the given index
   *
   * @param {Number} index          The Number representing the index position of
   *                                a line item
   * @param {object} lineItemData The Object representing the fields and values
   *                                for a line item alteration
   * @memberof NetsuiteToolkit.SublistProcessor
   */
  SublistProcessor.prototype.updateLineItemFields = function(index, lineItemData) {
    for (var field in lineItemData) {
      value = lineItemData[field];
      NetsuiteToolkit.setLineItemValue(this.record, this.sublistName, field, index, value);
    }
  };

  /**
   * Locates the index of a line item matching the given field data, returns
   * the first match encountered. An exception is raised if no match is found
   *
   * @param {String} matchField The String representing the internalid of a line item
   *                             field
   * @param {object} data        The Object representing the line item field and value
   *                             data
   * @memberof NetsuiteToolkit.SublistProcessor
   * @return {Number} The Number representing the index of the mateched line item
   */
  SublistProcessor.prototype.matchLineItemByField = function(matchField, data) {
    matchValue = data[matchField];
    count      = NetsuiteToolkit.getLineItemCount(this.record, this.sublistName);

    for (var index = 1; index <= count; index++) {
      if (this.compareLineItemValue(index, matchField, matchValue)) { return index; }
    }

    throw NetsuiteToolkit.SublistProcessor.UnableToMatch;
  };

  /**
   * Compares the value of a given field at a given line item index with the
   * given value
   *
   * @param {Number} index       The Number representing the index position of the line item
   * @param {String} matchField The String representing the internalid of the line item field
   * @param {String} matchValue The String representing the value to be compared against
   * @memberof NetsuiteToolkit.SublistProcessor
   * @return {Boolean} The Boolean representing the successful match
   */
  SublistProcessor.prototype.compareLineItemValue = function(index, matchField, matchValue) {
    netsuiteValue = NetsuiteToolkit.getLineItemValue(this.record, this.sublistName,
                                                      index, matchField);
    return (netsuiteValue == matchValue);
  };

  return SublistProcessor;
})();

/**
 * An exception thrown in the event that the sublist data given is malformed.
 * @static
 * @field
 * @memberof NetsuiteToolkit.SublistProcessor
 */
NetsuiteToolkit.SublistProcessor.MalformedData = new Error(malformedDataError);

/**
 * An exception thrown in the event that a line item cannot be matched
 * to a given field.
 * @static
 * @field
 * @memberof NetsuiteToolkit.SublistProcessor
 */
NetsuiteToolkit.SublistProcessor.UnableToMatch = new Error(lineItemMatchError);

if (typeof(exports) != 'undefined') {
  exports.NetsuiteToolkit = NetsuiteToolkit;
}
