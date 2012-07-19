/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"S4YRJ99zFOUEiNRKzClkxbQEipf9pWTt"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"xiVRG5SG0Kal8eRo4casTYAdk4ot7LBA"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"U3jdLt0GF3o9S73FOWKtKSBYmwyZ2JXu"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"suKZB9ZoLvCRLhxOWug1UUuFyAZxSzHm"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"lLtksT73XeWrsu2N0E3l8Pfb9ygaJUZZ"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"nynEoCsWcOHbBiVWAX7O3W25sQFZ0VoM"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
